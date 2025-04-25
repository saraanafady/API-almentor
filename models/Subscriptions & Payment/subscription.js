const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      unique: true,
      trim: true,
      enum: ["monthly", "quarterly", "semi-annual", "annual", "lifetime"],
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        default: "USD",
        enum: ["USD", "EGP"],
      },
      originalAmount: Number,
    },
    duration: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["days", "months", "years"],
        default: "months",
      },
    },
    features: [
      {
        title: String,
        description: String,
        icon: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    trialPeriod: {
      enabled: {
        type: Boolean,
        default: false,
      },
      durationDays: {
        type: Number,
        default: 7,
      },
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

subscriptionSchema.virtual("pricePerMonth").get(function () {
  if (this.duration.unit === "months")
    return this.price.amount / this.duration.value;
  if (this.duration.unit === "years")
    return this.price.amount / (this.duration.value * 12);
  return this.price.amount / (this.duration.value / 30);
});

// Indexes


module.exports = mongoose.model("Subscription", subscriptionSchema);
