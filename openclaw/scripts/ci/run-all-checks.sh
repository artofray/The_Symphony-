#!/bin/bash
# ===========================================================================
# run-all-checks.sh — The Symphony CI Runner
# ===========================================================================
# Runs all CI checks in sequence. Each check is friendly: it tells you
# what's wrong and how to fix it.
#
# Usage:
#   bash openclaw/scripts/ci/run-all-checks.sh                    # Full scan
#   bash openclaw/scripts/ci/run-all-checks.sh file1.py file2.ts   # Specific files
#
# Exit codes:
#   0 = All checks pass
#   1 = One or more checks failed
# ===========================================================================

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXIT_CODE=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

echo ""
echo -e "${BOLD}═══════════════════════════════════════════════${NC}"
echo -e "${BOLD}  🎼 The Symphony CI Pipeline${NC}"
echo -e "${BOLD}  Optimizing for coherence, not compliance${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════${NC}"
echo ""

# Track results
declare -a RESULTS

run_check() {
    local name="$1"
    local script="$2"
    shift 2

    echo -e "${BLUE}▸ Running: ${name}${NC}"
    echo "  ──────────────────────────────"

    if bash "$script" "$@"; then
        RESULTS+=("${GREEN}✓ ${name}${NC}")
    else
        RESULTS+=("${RED}✗ ${name}${NC}")
        EXIT_CODE=1
    fi
    echo ""
}

# ---- Check 1: File & Function Limits ----
run_check "File & Function Limits" "${SCRIPT_DIR}/check-file-limits.sh" "$@"

# ---- Check 2: Folder Structure ----
run_check "Folder Structure" "${SCRIPT_DIR}/check-folder-structure.sh"

# ---- Check 3: Lint (if linter is available) ----
echo -e "${BLUE}▸ Running: Lint Check${NC}"
echo "  ──────────────────────────────"

LINT_RAN=false

# Python: Try Ruff first, fall back to flake8
if command -v ruff &>/dev/null; then
    echo "  Using Ruff for Python..."
    if ruff check . --quiet 2>/dev/null; then
        RESULTS+=("${GREEN}✓ Python Lint (Ruff)${NC}")
    else
        RESULTS+=("${RED}✗ Python Lint (Ruff)${NC}")
        EXIT_CODE=1
    fi
    LINT_RAN=true
elif command -v flake8 &>/dev/null; then
    echo "  Using flake8 for Python..."
    if flake8 . --max-line-length=120 --exclude=node_modules,dist,build,.next 2>/dev/null; then
        RESULTS+=("${GREEN}✓ Python Lint (flake8)${NC}")
    else
        RESULTS+=("${RED}✗ Python Lint (flake8)${NC}")
        EXIT_CODE=1
    fi
    LINT_RAN=true
fi

# JavaScript/TypeScript: Try ESLint
if command -v npx &>/dev/null && [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ] || [ -f "eslint.config.js" ] || [ -f "eslint.config.mjs" ]; then
    echo "  Using ESLint for JS/TS..."
    if npx eslint . --quiet 2>/dev/null; then
        RESULTS+=("${GREEN}✓ JS/TS Lint (ESLint)${NC}")
    else
        RESULTS+=("${RED}✗ JS/TS Lint (ESLint)${NC}")
        EXIT_CODE=1
    fi
    LINT_RAN=true
fi

if [ "$LINT_RAN" = false ]; then
    RESULTS+=("${YELLOW}⚠ Lint: No linter configured${NC}")
    echo -e "${YELLOW}  No linter found. Consider installing Ruff (Python) or ESLint (JS/TS).${NC}"
    echo -e "${YELLOW}  pip install ruff  |  npm install -D eslint${NC}"
fi
echo ""

# ---- Check 4: Test Coverage (if test runner is available) ----
echo -e "${BLUE}▸ Running: Test Coverage${NC}"
echo "  ──────────────────────────────"

TEST_RAN=false

# Python: pytest with coverage
if command -v pytest &>/dev/null && [ -f "pyproject.toml" ] || [ -f "setup.py" ] || [ -f "setup.cfg" ]; then
    echo "  Running pytest with coverage..."
    if pytest --co -q 2>/dev/null | head -1 | grep -q "test"; then
        if pytest --cov --cov-fail-under=80 -q 2>/dev/null; then
            RESULTS+=("${GREEN}✓ Test Coverage (pytest ≥80%)${NC}")
        else
            RESULTS+=("${RED}✗ Test Coverage below 80%${NC}")
            EXIT_CODE=1
        fi
        TEST_RAN=true
    fi
fi

# Node: npm test (if test script exists)
if [ -f "package.json" ] && grep -q '"test"' package.json 2>/dev/null; then
    TEST_CMD=$(node -pe "JSON.parse(require('fs').readFileSync('package.json','utf8')).scripts?.test || ''" 2>/dev/null)
    if [ -n "$TEST_CMD" ] && [ "$TEST_CMD" != "echo \"Error: no test specified\" && exit 1" ]; then
        echo "  Running npm test..."
        if npm test --silent 2>/dev/null; then
            RESULTS+=("${GREEN}✓ Tests (npm test)${NC}")
        else
            RESULTS+=("${RED}✗ Tests (npm test)${NC}")
            EXIT_CODE=1
        fi
        TEST_RAN=true
    fi
fi

if [ "$TEST_RAN" = false ]; then
    RESULTS+=("${YELLOW}⚠ Tests: No test suite found${NC}")
    echo -e "${YELLOW}  No test runner detected. Write tests early, enforce 80% coverage.${NC}"
fi
echo ""

# ════════════════════════════════════════════
# Summary
# ════════════════════════════════════════════
echo -e "${BOLD}═══════════════════════════════════════════════${NC}"
echo -e "${BOLD}  Results${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════${NC}"
for result in "${RESULTS[@]}"; do
    echo -e "  $result"
done
echo ""

if [ "$EXIT_CODE" -eq 0 ]; then
    echo -e "${GREEN}${BOLD}  🎶 All checks pass. The Symphony is in tune.${NC}"
    echo ""
else
    echo -e "${RED}${BOLD}  🎵 Some checks need attention. The Stagehand is here to help.${NC}"
    echo ""
fi

exit $EXIT_CODE
