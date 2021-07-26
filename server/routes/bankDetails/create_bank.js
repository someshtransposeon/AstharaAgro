const express = require('express');
const router = express.Router();
const Bank = require('../../models/bankDetails/bank');

router.post('/create_bank', (req, res)=>{
    var newBank = new Bank({
        userId: req.body.userId,
        bank_name: req.body.bank_name,
        branch_name: req.body.branch_name,
        account_number: req.body.account_number,
        account_holder_name: req.body.account_holder_name,
        ifsc_code: req.body.ifsc_code,
    })
    newBank.save()
    .then(bank => {
        res.json(bank);
    })
    .catch(err => res.json(err));
});

module.exports = router;