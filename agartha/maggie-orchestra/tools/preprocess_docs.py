import argparse
import json
import pathlib
import re
import subprocess
from datetime import datetime, timezone


def read_text(path: pathlib.Path) -> str:
    ext = path.suffix.lower()
    if ext in {".txt", ".md", ".markdown", ".rst"}:
        return path.read_text(encoding="utf-8", errors="ignore")
    if ext == ".pdf":
        # 1) Try pypdf text extraction
        try:
            from pypdf import PdfReader
        except Exception:
            pass
        else:
            try:
                reader = PdfReader(str(path))
                text = "\n".join((page.extract_text() or "") for page in reader.pages)
                if text.strip():
                    return text
            except Exception:
                pass

        # 2) Try system pdftotext if available
        try:
            tmp_txt = path.with_suffix(".tmp_extract.txt")
            cmd = ["pdftotext", str(path), str(tmp_txt)]
            result = subprocess.run(cmd, capture_output=True, text=True, check=False)
            if result.returncode == 0 and tmp_txt.exists():
                txt = tmp_txt.read_text(encoding="utf-8", errors="ignore")
                tmp_txt.unlink(missing_ok=True)
                if txt.strip():
                    return txt
        except Exception:
            pass

        return ""
    return path.read_text(encoding="utf-8", errors="ignore")


def normalize(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def chunk_text(text: str, chunk_size: int = 1200, overlap: int = 120):
    if not text:
        return []
    chunks = []
    start = 0
    idx = 0
    n = len(text)
    while start < n:
        end = min(n, start + chunk_size)
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(
                {
                    "chunk_id": idx,
                    "start_char": start,
                    "end_char": end,
                    "text": chunk,
                    "char_count": len(chunk),
                    "token_estimate": max(1, int(len(chunk) / 4)),
                }
            )
            idx += 1
        if end >= n:
            break
        start = max(0, end - overlap)
    return chunks


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True)
    ap.add_argument("--output-dir", required=True)
    ap.add_argument("--chunk-size", type=int, default=1200)
    ap.add_argument("--overlap", type=int, default=120)
    args = ap.parse_args()

    in_path = pathlib.Path(args.input)
    out_dir = pathlib.Path(args.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    text = normalize(read_text(in_path))
    chunks = chunk_text(text, chunk_size=args.chunk_size, overlap=args.overlap)

    stem = in_path.stem
    chunks_path = out_dir / f"{stem}.chunks.jsonl"
    manifest_path = out_dir / f"{stem}.manifest.json"
    latest_manifest_path = out_dir / "latest.manifest.json"

    with chunks_path.open("w", encoding="utf-8") as f:
        for c in chunks:
            f.write(json.dumps(c, ensure_ascii=True) + "\n")

    manifest = {
        "source_file": str(in_path),
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "normalized_char_count": len(text),
        "chunk_count": len(chunks),
        "chunk_size": args.chunk_size,
        "overlap": args.overlap,
        "chunks_file": str(chunks_path),
        "token_estimate_total": sum(c["token_estimate"] for c in chunks),
        "warnings": [] if chunks else [
            "No extractable text found. If this is a scanned PDF, install OCR pipeline (tesseract + OCRmyPDF) or provide TXT/MD export."
        ],
    }
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    latest_manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(str(manifest_path))


if __name__ == "__main__":
    main()
