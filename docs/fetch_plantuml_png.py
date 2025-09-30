import sys, urllib.parse, urllib.request, base64, zlib

def encode_plantuml_text(text: bytes) -> str:
    alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"
    data = zlib.compress(text)
    # strip zlib header and checksum
    data = data[2:-4]
    res = []
    i = 0
    def append3bytes(b1, b2, b3):
        c1 = b1 >> 2
        c2 = ((b1 & 0x3) << 4) | (b2 >> 4)
        c3 = ((b2 & 0xF) << 2) | (b3 >> 6)
        c4 = b3 & 0x3F
        return alphabet[c1] + alphabet[c2] + alphabet[c3] + alphabet[c4]
    while i < len(data):
        b1 = data[i]
        b2 = data[i+1] if i+1 < len(data) else 0
        b3 = data[i+2] if i+2 < len(data) else 0
        res.append(append3bytes(b1, b2, b3))
        i += 3
    return ''.join(res)

if __name__ == '__main__':
    puml_file = 'er-diagram.puml'
    out_file = 'er-diagram.png'
    with open(puml_file, 'rb') as f:
        data = f.read()
    enc = encode_plantuml_text(data)
    url = 'http://www.plantuml.com/plantuml/png/' + enc
    print('Requesting', url[:120] + '...')
    resp = urllib.request.urlopen(url)
    img = resp.read()
    with open(out_file, 'wb') as f:
        f.write(img)
    print('Saved', out_file)
