import os
import shutil
from pathlib import Path

def convert_filename(old_name):
    # Remove .png extension
    name = old_name.replace('.png', '')
    
    # Split parts
    parts = name.split('_of_')
    if len(parts) != 2:
        return None
        
    value, suit = parts[0], parts[1]
    
    # Convert value
    value_map = {
        'ace': 'A',
        'king': 'K',
        'queen': 'Q',
        'jack': 'J',
        '10': 'T'
    }
    
    # If value is in map, convert it, otherwise keep original (2-9)
    new_value = value_map.get(value, value)
    
    # Construct new filename: suit + value + .png
    return f"{suit}{new_value}.png"

def main():
    # Source directory with PNG files
    src_dir = Path(r"C:\Users\cjens\OneDrive\Desktop\Downloads\PNG-cards-1.3\PNG-cards-1.3")
    
    # Create output directory if it doesn't exist
    out_dir = Path("assets3")
    out_dir.mkdir(exist_ok=True)
    
    # Process each PNG file
    for file in src_dir.glob("*.png"):
        new_name = convert_filename(file.name)
        if new_name:
            print(f"Converting {file.name} -> {new_name}")
            shutil.copy2(file, out_dir / new_name)
            
    print("\nConversion complete! Files copied to assets3 directory.")

if __name__ == "__main__":
    main()
