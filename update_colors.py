import os
import re

# Mapping of old colors to new colors
color_map = {
    '#500000': '#ff1022',
    '#D00000': '#ff1022',
    '#800000': '#ff1022',
    '#0a0a0a': '#000000',
    '#141414': '#0a0a0a',
    '#1c1c1c': '#111111',
    '#f0f0f0': '#ffffff',
    'rgba(80,0,0': 'rgba(255,16,34',
    'rgba(80, 0, 0': 'rgba(255, 16, 34',
    '#e63329': '#ff1022',
}

search_dir = r'd:\Dx as spider\dx-media'
extensions = ('.tsx', '.ts', '.css')

def main():
    for root, dirs, files in os.walk(search_dir):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.next' in dirs:
            dirs.remove('.next')
            
        for file in files:
            if file.endswith(extensions):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for old, new in color_map.items():
                        new_content = new_content.replace(old, new)
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {filepath}")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

if __name__ == '__main__':
    main()
