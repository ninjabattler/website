export default async function handler(req, res) {
  try {
    const url = req.query.url;
    // let url = "/articles";

    // if (search.includes("url=")) {
      // url = `http://${search.split("url=")[1]}`;
    // }

    console.log(url)

    res.setDraftMode({ enable: true })
    res.redirect(`http://${url}`)
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error with preview or something')
  }
}