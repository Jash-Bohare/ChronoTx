const supabase = require('../db/supabaseClient');

const saveContract = async (req, res) => {
    const { address, chain, bytecode, constructorParams } = req.body;

    if (!address || !chain || !bytecode) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // First, find or create user
        let { data: user, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('wallet_address', address)
            .single();

        if (!user) {
            const { data: newUser, error: insertError } = await supabase
                .from('users')
                .insert([{ wallet_address: address }])
                .select()
                .single();
            user = newUser;
        }

        // Now insert contract
        const { data: contract, error: contractError } = await supabase
            .from('contracts')
            .insert([
                {
                    user_id: user.id,
                    chain,
                    bytecode,
                    constructor_params: constructorParams || null,
                },
            ])
            .select()
            .single();


        res.status(200).json({ message: 'Contract saved', contract });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { saveContract };
