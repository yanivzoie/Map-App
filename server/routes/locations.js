const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
let store = require('../middleware/storeUsers');

// router.post('/add', verifyToken, (req, res) => {
//   res.send(req.user);
// });

router.post('/add', verifyToken, async (req, res) => {
  location = {
    locationName: req.body.locationName,
    coords: { lat: req.body.lat, lng: req.body.lng },
  };
  const user = await store.findUserById(req.user.id);
  user.locations.push(location);
  await store.save();
  res.send('saved..');
});

router.get('/', verifyToken, async (req, res) => {
  const user = await store.findUserById(req.user.id);
  if (!user) throw Error('No items');
  res.send(user.locations);
});

module.exports = router;
