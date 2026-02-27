#!/bin/bash
# ===========================================================================
# check-folder-structure.sh — Validate project layout for coherence
# ===========================================================================
# Part of The Symphony CI pipeline
# Philosophy: Structure creates freedom. When everything has a place,
# agents and humans can navigate the project without guessing.
#
# This script validates that:
#   1. Every skill has a SKILL.md
#   2. Required top-level files exist
#   3. No orphaned files in unexpected locations
#   4. Naming conventions are followed
# ===========================================================================

set -euo pipefail

EXIT_CODE=0
WARNINGS=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Base directory (relative to where the script is run)
OPENCLAW_DIR="${OPENCLAW_DIR:-openclaw}"

echo "🎻 Symphony CI: Folder Structure Check"
echo "  Scanning: ${OPENCLAW_DIR}/"
echo ""

# ---- Check 1: Required top-level files ----
echo "Checking required files..."
REQUIRED_FILES=(
    "${OPENCLAW_DIR}/AGENTS.md"
    "${OPENCLAW_DIR}/SOUL.md"
    "${OPENCLAW_DIR}/IDENTITY.md"
    "${OPENCLAW_DIR}/HEARTBEAT.md"
    "${OPENCLAW_DIR}/MEMORY.md"
    "${OPENCLAW_DIR}/TOOLS.md"
    "${OPENCLAW_DIR}/USER.md"
    "${OPENCLAW_DIR}/SUBAGENT-POLICY.md"
    "${OPENCLAW_DIR}/config.yaml"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}  ✗ Missing: ${file}${NC}"
        echo -e "${YELLOW}    → This is a core system file. The Symphony needs it to function.${NC}"
        EXIT_CODE=1
    else
        echo -e "${GREEN}  ✓ ${file}${NC}"
    fi
done

# ---- Check 2: Every skill directory has a SKILL.md ----
echo ""
echo "Checking skills..."
SKILLS_DIR="${OPENCLAW_DIR}/skills"

if [ -d "$SKILLS_DIR" ]; then
    for skill_dir in "$SKILLS_DIR"/*/; do
        [ ! -d "$skill_dir" ] && continue
        skill_name=$(basename "$skill_dir")

        if [ ! -f "${skill_dir}SKILL.md" ]; then
            echo -e "${RED}  ✗ ${skill_name}/: missing SKILL.md${NC}"
            echo -e "${YELLOW}    → Every skill needs a SKILL.md with instructions. Without it, agents can't use this skill.${NC}"
            EXIT_CODE=1
        else
            echo -e "${GREEN}  ✓ ${skill_name}/ has SKILL.md${NC}"
        fi
    done
else
    echo -e "${YELLOW}  ⚠ Skills directory not found at ${SKILLS_DIR}/${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# ---- Check 3: Naming conventions ----
echo ""
echo "Checking naming conventions..."

# Skill directories should be lowercase with hyphens
if [ -d "$SKILLS_DIR" ]; then
    for skill_dir in "$SKILLS_DIR"/*/; do
        [ ! -d "$skill_dir" ] && continue
        skill_name=$(basename "$skill_dir")

        # Check for underscores (should use hyphens) or uppercase
        if echo "$skill_name" | grep -qP '[A-Z]'; then
            echo -e "${YELLOW}  ⚠ ${skill_name}/: skill directories should be lowercase${NC}"
            WARNINGS=$((WARNINGS + 1))
        fi
    done
fi

# ---- Check 4: Required subdirectories exist ----
echo ""
echo "Checking directory structure..."
REQUIRED_DIRS=(
    "${OPENCLAW_DIR}/skills"
    "${OPENCLAW_DIR}/config"
    "${OPENCLAW_DIR}/scripts"
    "${OPENCLAW_DIR}/guides"
    "${OPENCLAW_DIR}/data"
    "${OPENCLAW_DIR}/knowledge"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        echo -e "${YELLOW}  ⚠ Missing directory: ${dir}/${NC}"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "${GREEN}  ✓ ${dir}/${NC}"
    fi
done

# ---- Check 5: No stray files in the skills root ----
echo ""
echo "Checking for stray files..."

STRAY_FILES=$(find "$SKILLS_DIR" -maxdepth 1 -type f 2>/dev/null || true)
if [ -n "$STRAY_FILES" ]; then
    echo -e "${YELLOW}  ⚠ Found files directly in ${SKILLS_DIR}/ (should be in subdirectories):${NC}"
    while IFS= read -r stray; do
        [ -z "$stray" ] && continue
        echo -e "${YELLOW}    - $(basename "$stray")${NC}"
    done <<< "$STRAY_FILES"
    WARNINGS=$((WARNINGS + 1))
fi

# ---- Check 6: CI scripts directory has the runner ----
echo ""
CI_DIR="${OPENCLAW_DIR}/scripts/ci"
if [ -d "$CI_DIR" ]; then
    if [ ! -f "${CI_DIR}/run-all-checks.sh" ]; then
        echo -e "${YELLOW}  ⚠ Missing CI runner: ${CI_DIR}/run-all-checks.sh${NC}"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "${GREEN}  ✓ CI runner present${NC}"
    fi
else
    echo -e "${YELLOW}  ⚠ CI directory not found at ${CI_DIR}/${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# ---- Summary ----
echo ""
if [ "$EXIT_CODE" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo -e "${GREEN}✓ Folder structure is coherent. Everything in its place. 🎶${NC}"
elif [ "$EXIT_CODE" -eq 0 ]; then
    echo -e "${YELLOW}⚠ Structure is valid with ${WARNINGS} warning(s). Consider tidying up.${NC}"
else
    echo -e "${RED}✗ Structure issues found. The Symphony needs a cleaner stage.${NC}"
fi

exit $EXIT_CODE
