import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['normal', 'live'], // Adjust enums based on types you expect
         
    },
    images: {
        type: String,
         
    },
    title: {
        type: String,
         
    },
    message: {
        type: String,
         
    },
    date: {
        type: Date,
         
    },
    notificationData: {
        type: String,
         
    },
    importantDate: {
        heading: {
            type: String,
             
        },
        table_data: [
            {
                event_name: {
                    type: String,
                     
                },
                date: {
                    type: String,
                     
                },
            },
        ],
    },
    applicationFee: {
        heading: {
            type: String,
             
        },
        table_data: [
            {
                category: {
                    type: String,
                     
                },
                fee: {
                    type: String,
                     
                },
            },
        ],
        note: {
            type: String,
             
        },
    },
    vacancyDetails: {
        heading: {
            type: String,
             
        },
        table_data: [
            {
                postName: {
                    type: String,
                     
                },
                totalPosts: {
                    type: String,
                     
                },
            },
        ],
    },
    eligibilityCriteria: {
        heading: {
            type: String,
             
        },
        listItems: [
            {
                item: {
                    type: String,
                    default: '',
                },
            },
        ],
        table_data: [
            {
                name: {
                    type: String,
                     
                },
                type: {
                    type: String,
                     
                },
                posts: {
                    type: String,
                     
                },
            },
        ],
    },
    howToApply: {
        heading: {
            type: String,
             
        },
        listItems: [
            {
                item: {
                    type: String,
                    default: '',
                },
            },
        ],
    },
    usefulLinks: {
        heading: {
            type: String,
             
        },
        table_data: [
            {
                linkDesc: {
                    type: String,
                     
                },
                url: {
                    type: String,
                     
                },
            },
        ],
    },
    notiFooterData: {
        type: String,
         
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Notification = mongoose.models.notifications || mongoose.model('notifications', notificationSchema);

export default Notification;
