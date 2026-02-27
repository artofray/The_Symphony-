#!/bin/bash
# ===========================================================================
# check-file-limits.sh — Enforce max file and function length
# ===========================================================================
# Part of The Symphony CI pipeline
# Philosophy: Small files, small functions, coherent systems.
#
# Limits:
#   - Max file length:     800 lines
#   - Max function length:  80 lines
#
# Why: Agents (and humans) lose context in large files. Functions with a
# single clear purpose are easier to test, review, and modify. Coherent
# systems are made of small, understandable pieces.
# ===========================================================================

set -euo pipefail

MAX_FILE_LINES=800
MAX_FUNC_LINES=80
EXIT_CODE=0
CHECKED=0
FAILED=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# File extensions to check
EXTENSIONS="py,js,ts,jsx,tsx,mjs,cjs"

echo "🎻 Symphony CI: File & Function Limits Check"
echo "  Max file length:     ${MAX_FILE_LINES} lines"
echo "  Max function length: ${MAX_FUNC_LINES} lines"
echo ""

# Accept specific files as arguments, or scan the whole project
if [ $# -gt 0 ]; then
    FILES="$@"
else
    # Build the find command for all extensions
    FIND_ARGS=""
    IFS=',' read -ra EXT_ARRAY <<< "$EXTENSIONS"
    for i in "${!EXT_ARRAY[@]}"; do
        if [ "$i" -eq 0 ]; then
            FIND_ARGS="-name '*.${EXT_ARRAY[$i]}'"
        else
            FIND_ARGS="$FIND_ARGS -o -name '*.${EXT_ARRAY[$i]}'"
        fi
    done

    FILES=$(eval "find . \( $FIND_ARGS \) -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' -not -path '*/build/*' -not -path '*/.next/*' -not -path '*/vendor/*'" 2>/dev/null || true)
fi

if [ -z "$FILES" ]; then
    echo -e "${GREEN}✓ No source files found to check.${NC}"
    exit 0
fi

# ---- Check file lengths ----
echo "Checking file lengths..."
while IFS= read -r file; do
    [ -z "$file" ] && continue
    [ ! -f "$file" ] && continue

    LINES=$(wc -l < "$file")
    CHECKED=$((CHECKED + 1))

    if [ "$LINES" -gt "$MAX_FILE_LINES" ]; then
        echo -e "${RED}  ✗ ${file}: ${LINES} lines (max ${MAX_FILE_LINES})${NC}"
        echo -e "${YELLOW}    → Break this into smaller modules. Each file should have one clear responsibility.${NC}"
        FAILED=$((FAILED + 1))
        EXIT_CODE=1
    fi
done <<< "$FILES"

# ---- Check function lengths (Python) ----
echo ""
echo "Checking function lengths (Python)..."
PYTHON_FILES=$(echo "$FILES" | grep '\.py$' || true)

if [ -n "$PYTHON_FILES" ]; then
    while IFS= read -r file; do
        [ -z "$file" ] && continue
        [ ! -f "$file" ] && continue

        # Use awk to find function definitions and their lengths
        awk '
        /^[[:space:]]*(def |async def )/ {
            if (func_name != "" && func_lines > '"$MAX_FUNC_LINES"') {
                printf "  ✗ %s: function \"%s\" at line %d is %d lines (max '"$MAX_FUNC_LINES"')\n", FILENAME, func_name, func_start, func_lines
                printf "    → Extract helper functions. Each function should do one thing.\n"
                failed = 1
            }
            # Capture function name
            match($0, /(def |async def )([a-zA-Z_][a-zA-Z0-9_]*)/, arr)
            func_name = arr[2]
            func_start = NR
            func_lines = 0
        }
        func_name != "" { func_lines++ }
        END {
            if (func_name != "" && func_lines > '"$MAX_FUNC_LINES"') {
                printf "  ✗ %s: function \"%s\" at line %d is %d lines (max '"$MAX_FUNC_LINES"')\n", FILENAME, func_name, func_start, func_lines
                printf "    → Extract helper functions. Each function should do one thing.\n"
            }
        }
        ' "$file" && true

    done <<< "$PYTHON_FILES"
fi

# ---- Check function lengths (JavaScript/TypeScript) ----
echo ""
echo "Checking function lengths (JS/TS)..."
JS_FILES=$(echo "$FILES" | grep -E '\.(js|ts|jsx|tsx|mjs|cjs)$' || true)

if [ -n "$JS_FILES" ]; then
    while IFS= read -r file; do
        [ -z "$file" ] && continue
        [ ! -f "$file" ] && continue

        # Simple heuristic: count lines between function-like declarations
        # and their closing braces. Not perfect, but catches the big ones.
        awk '
        /^[[:space:]]*(export )?(async )?(function |const [a-zA-Z_]+ = (async )?\(|const [a-zA-Z_]+ = (async )?function)/ {
            if (func_name != "" && func_lines > '"$MAX_FUNC_LINES"') {
                printf "  ✗ %s: function near line %d is %d lines (max '"$MAX_FUNC_LINES"')\n", FILENAME, func_start, func_lines
                printf "    → Extract helper functions. Each function should do one thing.\n"
            }
            func_name = "func"
            func_start = NR
            func_lines = 0
            brace_depth = 0
        }
        func_name != "" {
            func_lines++
            gsub(/[^{]/, "", $0); brace_depth += length($0)
            line = $0
            gsub(/[^}]/, "", line); brace_depth -= length(line)
            if (brace_depth <= 0 && func_lines > 1) {
                if (func_lines > '"$MAX_FUNC_LINES"') {
                    printf "  ✗ %s: function near line %d is %d lines (max '"$MAX_FUNC_LINES"')\n", FILENAME, func_start, func_lines
                    printf "    → Extract helper functions. Each function should do one thing.\n"
                }
                func_name = ""
            }
        }
        ' "$file" && true

    done <<< "$JS_FILES"
fi

# ---- Summary ----
echo ""
if [ "$EXIT_CODE" -eq 0 ]; then
    echo -e "${GREEN}✓ All ${CHECKED} files within limits. Symphony is in tune. 🎶${NC}"
else
    echo -e "${RED}✗ ${FAILED} file(s) exceed the limit.${NC}"
    echo -e "${YELLOW}  Need help breaking these down? The Stagehand can suggest a refactor plan.${NC}"
fi

exit $EXIT_CODE
