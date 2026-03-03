import os
import re

def get_all_files(directory, extensions):
    files_list = []
    for root, _, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                files_list.append(os.path.join(root, file))
    return files_list

src_dir = os.path.join(os.getcwd(), 'src')
root_dir = os.getcwd()

# Get all files that could contain imports/references
all_code_files = get_all_files(src_dir, ['.js', '.jsx', '.css']) + [os.path.join(root_dir, 'index.html')]

# Read all content into one massive string
all_content = ""
for f in all_code_files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            all_content += file.read() + "\n"
    except Exception as e:
        print(f"Error reading {f}: {e}")

# Check src files
src_candidate_files = get_all_files(src_dir, ['.js', '.jsx', '.css'])
unused_src = []
for f in src_candidate_files:
    basename = os.path.splitext(os.path.basename(f))[0]
    if basename in ['main', 'App', 'index', 'globals']:
        continue
    
    # regex to find exact word match for basename
    matches = len(re.findall(r'\b' + re.escape(basename) + r'\b', all_content))
    
    try:
        with open(f, 'r', encoding='utf-8') as file:
            self_content = file.read()
            self_matches = len(re.findall(r'\b' + re.escape(basename) + r'\b', self_content))
    except Exception:
        self_matches = 0
        
    if matches <= self_matches:
        unused_src.append(f)

# Check public files
public_dir = os.path.join(root_dir, 'public')
public_candidate_files = get_all_files(public_dir, ['.svg', '.png', '.jpg', '.ico', '.json', '.js', ''])
unused_public = []
for f in public_candidate_files:
    filename = os.path.basename(f)
    if filename == '_redirects': 
        continue # explicit ignore, used by cloudflare/netlify
    if filename not in all_content:
        unused_public.append(f)

print("Unused SRC files:")
for f in unused_src: print(os.path.relpath(f, root_dir))
print("\nUnused PUBLIC files:")
for f in unused_public: print(os.path.relpath(f, root_dir))
