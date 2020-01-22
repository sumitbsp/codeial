module.exports.home = function (req, res) {
    console.log(req.cookies);
    res.cookie('hello', 'pallu')
    return res.render('home', {
        title: "Home"
    });
};