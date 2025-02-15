import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: [2, "Subscription name must be at least 2 characters long"],
        maxlength: [50, "Subscription name must be at most 50 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Subscription price must be greater than 0"]
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "INR"],
        default: "INR",
    },
    frequency: {
        type: String,
        enum: [ "Daily", "Weekly", "Monthly", "Yearly"],
    },
    category: {
        type: String,
        enum:['sports',"news", "entertainment", "business", "health", "science", "technology", "politics"],
        required: [true, "Subscription category is required"]
    },
    paymentMethod: {
        type: String,
        required: [true, "Subscription payment method is required"],
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "paused"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: [true, "Subscription start date is required"],
        validate: {
            validator:function (value) {
                return value < Date.now();
            },
            message: "Subscription start date cannot be in the future"
        }
    },
   renewalDate: {
       type: Date,
       validate: {
           validator: function (value) {
            return value > this.startDate;
           },
           message: "Subscription renewal date cannot be in the future"
       }
   },
   user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: [true, "Subscription user is required"]
   }
}, {timestamps: true});

subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            Daily: 1,
            Weekly: 7,
            Monthly: 30,
            Yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.startDate.getDate() + renewalPeriods[this.frequency]);
    }
    if (this.renewalDate < Date.now()) {
        this.status = "expired";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;