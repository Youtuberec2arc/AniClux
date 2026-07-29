#!/bin/bash
npm run build
git add .
git commit -m "Auto-update: $(date)"
git push origin main
