import Tailor  from "../models/Tailor.js";

export const createOrUpdateTailorProfile = async (req, res) => {
    try{
        const {shopName, address, services, pricing, photos} = req.body;
        let tailor = await Tailor.findOne({user: req.user._id});
        if(tailor) {
            tailor.shopName = shopName;
            tailor.address = address;
            tailor.services = services;
            tailor.pricing = pricing;
            tailor.photos = photos;
        }
        else{
            tailor = new Tailor({
                user: req.user._id,
                shopName,
                address,
                services,
                pricing,
                photos,
            });
        }
        await tailor.save();
        res.status(200).json(tailor);
    } catch(err) {
        res.status(500).json({msg: err.message});
    }
};
export const getAllTailors = async (req, res) => {
    try{
        const tailors = await Tailor.find().populate("user", "name email");
        res.status(200).json(tailors);
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}
export const getTailorById = async (req, res) => {
    try {
        const tailor = await Tailor.findById(req.params.id).populate("user", "name email");

        if (!tailor) {
            return res.status(404).json({ msg: "Tailor not found" });
        }

        res.status(200).json(tailor);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
