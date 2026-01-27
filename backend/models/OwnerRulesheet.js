import mongoose from "mongoose";

const AiRulesheetSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        businessInfo: {
            name: { type: String },
            type: { type: String },
            email: { type: String },
            phone: { type: String },
            websiteLink: { type: String },
            description: { type: String },
            targetCustomers: { type: String },
        },

        aiBehaviour: {
            personality: { type: String },
            responseStyle: { type: String },
            language: { type: String, default: "english" },
            restrictions: {
                noSlang: { type: Boolean, default: false },
                noJargon: { type: Boolean, default: false },
                noEmojis: { type: Boolean, default: false },
                noPromises: { type: Boolean, default: false },
            },
        },

        dosAndDonts: {
            canDo: { type: String },
            cannotDo: { type: String },
            restrictions: {
                discountAllowed: { type: Boolean, default: false },
                competitorComparison: { type: Boolean, default: false },
                priceNegotiation: { type: Boolean, default: false },
                futurePromises: { type: Boolean, default: false },
            },
        },
    },
    { timestamps: true }
);

const AiRulesheet = mongoose.model("AiRulesheet", AiRulesheetSchema);
export default AiRulesheet;
