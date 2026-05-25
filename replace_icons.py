import os
import re

src_dir = r"c:\Users\user\Desktop\Campus guide\src"

def get_relative_import_path(filepath, target_filename="CustomIcons.jsx"):
    # Calculate relative path from filepath to CustomIcons.jsx
    custom_icons_path = os.path.join(src_dir, "components", "common", target_filename)
    rel_path = os.path.relpath(custom_icons_path, os.path.dirname(filepath))
    rel_path = rel_path.replace("\\", "/")
    if not rel_path.startswith("."):
        rel_path = "./" + rel_path
    if rel_path.endswith(".jsx"):
        rel_path = rel_path[:-4]
    return rel_path

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Find lucide-react imports
    lucide_match = re.search(r"import\s+{([^}]+)}\s+from\s+['\"]lucide-react['\"];?", content)
    if not lucide_match:
        return
    
    imports_str = lucide_match.group(1)
    imports_list = [i.strip() for i in imports_str.split(",")]
    
    targets = ["Home", "BookOpen", "Wrench"]
    found_targets = [t for t in targets if t in imports_list]
    
    if not found_targets:
        return

    print(f"Modifying {filepath}")
    
    # Remove targets from lucide-react imports
    new_imports_list = [i for i in imports_list if i not in targets]
    if new_imports_list:
        new_lucide_import = "import { " + ", ".join(new_imports_list) + " } from 'lucide-react';"
    else:
        new_lucide_import = ""
        
    content = content.replace(lucide_match.group(0), new_lucide_import)
    
    # Add new CustomIcons import
    custom_imports = []
    if "Home" in found_targets: custom_imports.append("CustomHome")
    if "BookOpen" in found_targets: custom_imports.append("CustomGuide")
    if "Wrench" in found_targets: custom_imports.append("CustomTools")
    
    rel_import_path = get_relative_import_path(filepath)
    custom_import_stmt = f"import {{ {', '.join(custom_imports)} }} from '{rel_import_path}';\n"
    
    # Inject after the lucide import (or where it was)
    if new_lucide_import:
        content = content.replace(new_lucide_import, new_lucide_import + "\n" + custom_import_stmt)
    else:
        # Just put it near the top
        content = re.sub(r"(import React[^\n]*\n)", r"\1" + custom_import_stmt, content, count=1)
        if custom_import_stmt not in content:
            content = custom_import_stmt + content
            
    # Replace usages
    if "Home" in found_targets:
        content = re.sub(r"<Home(\s|>)", r"<CustomHome\1", content)
        content = re.sub(r"icon:\s*Home\b", r"icon: CustomHome", content)
        content = re.sub(r"icon=\{Home\}", r"icon={CustomHome}", content)
    if "BookOpen" in found_targets:
        content = re.sub(r"<BookOpen(\s|>)", r"<CustomGuide\1", content)
        content = re.sub(r"icon:\s*BookOpen\b", r"icon: CustomGuide", content)
        content = re.sub(r"icon=\{BookOpen\}", r"icon={CustomGuide}", content)
    if "Wrench" in found_targets:
        content = re.sub(r"<Wrench(\s|>)", r"<CustomTools\1", content)
        content = re.sub(r"icon:\s*Wrench\b", r"icon: CustomTools", content)
        content = re.sub(r"icon=\{Wrench\}", r"icon={CustomTools}", content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(".jsx") or file.endswith(".js"):
            process_file(os.path.join(root, file))

print("Done")
