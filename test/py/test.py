import warc
f = warc.open("C:\Users\wouter\Documents\GitHub\\node-warc\warc\crawl0.warc")
for record in f:
    print  record['Content-Length']
