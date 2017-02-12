export default function(cb) {
  const markerClass = 'churchie-marker',
    body = document.getElementsByTagName('body'),
    reactAnchor = document.createElement('div');

  reactAnchor.id = 'churchie-anchor';
  body[0].insertBefore(reactAnchor, body[0].firstChild);

  cb({'top': document.body.scrollTop});
};
