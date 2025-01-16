import JSZip from 'jszip';

export const generateEPUB = async (novelName: string, translationHistory: { novelName?: string; chapter?: string; translated: string; timestamp: number; }[]) => {
  const chapters = translationHistory.filter(item => item.novelName === novelName);

  if (chapters.length === 0) {
    alert('Bu roman için bölüm bulunamadı.');
    return;
  }

  const zip = new JSZip();

  // 1. Add mimetype
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });

  // 2. Add META-INF/container.xml
  zip.folder('META-INF')?.file(
    'container.xml',
    `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
  );

  // 3. Add OEBPS/content.opf
  const contentOpf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="2.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:title>${novelName}</dc:title>
    <dc:language>tr</dc:language>
    <dc:identifier id="BookId">urn:uuid:generated-uuid</dc:identifier>
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    ${chapters
      .map(
        (chapter, index) =>
          `<item id="chapter${index + 1}" href="chapter${index + 1}.xhtml" media-type="application/xhtml+xml"/>`
      )
      .join('\n    ')}
  </manifest>
  <spine toc="ncx">
    ${chapters.map((_, index) => `<itemref idref="chapter${index + 1}" />`).join('\n    ')}
  </spine>
</package>`;
  zip.folder('OEBPS')?.file('content.opf', contentOpf);

  // 4. Add OEBPS/toc.ncx
  const tocNcx = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:generated-uuid"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle>
    <text>${novelName}</text>
  </docTitle>
  <navMap>
    ${chapters
      .map(
        (chapter, index) => `
    <navPoint id="navPoint-${index + 1}" playOrder="${index + 1}">
      <navLabel>
        <text>${chapter.chapter || `Bölüm ${index + 1}`}</text>
      </navLabel>
      <content src="chapter${index + 1}.xhtml"/>
    </navPoint>`
      )
      .join('')}
  </navMap>
</ncx>`;
  zip.folder('OEBPS')?.file('toc.ncx', tocNcx);

  // 5. Add OEBPS/chapter*.xhtml (chapters)
  chapters.forEach((chapter, index) => {
    const chapterContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <title>${chapter.chapter || `Bölüm ${index + 1}`}</title>
</head>
<body>
  <h1>${chapter.chapter || `Bölüm ${index + 1}`}</h1>
  <p>${chapter.translated.replace(/\n/g, '</p><p>')}</p>
</body>
</html>`;
    zip.folder('OEBPS')?.file(`chapter${index + 1}.xhtml`, chapterContent);
  });

  // Generate the ZIP file
  zip.generateAsync({ type: 'blob' }).then((content) => {
    downloadFile(content, `${novelName}.epub`, 'application/epub+zip');
  });
};

// Function to trigger download
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}