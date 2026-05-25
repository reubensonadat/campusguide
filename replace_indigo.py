import os
import re

directories_to_search = [
    r"c:\Users\user\Desktop\Campus guide\src\components\guide",
    r"c:\Users\user\Desktop\Campus guide\src\pages"
]

def replace_in_file(filepath):
    if not filepath.endswith('.jsx') and not filepath.endswith('.js'):
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'indigo' in content:
        # replace indigo with primary
        new_content = content.replace('indigo', 'primary')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for d in directories_to_search:
    if os.path.isfile(d):
        replace_in_file(d)
    else:
        for root, dirs, files in os.walk(d):
            for file in files:
                replace_in_file(os.path.join(root, file))

print("Replacement complete.")
