export default function LoadApp(app, document_) {
  document_.body.innerHTML += app.getHTML();
}
