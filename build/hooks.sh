#!/bin/bash

if test -e .git/hooks; then
  ln -sf ../../bin/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit 
fi