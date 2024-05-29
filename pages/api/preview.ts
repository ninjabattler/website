export default async function handler(req, res) {
  try {
    const url = req.query.url;

    res.setDraftMode({ enable: true });
    res.redirect(`http://${url}`);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error with preview or something");
  }
}
