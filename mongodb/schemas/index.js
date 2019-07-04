import mongoose from "mongoose";

export const Fara = mongoose.model('Fara', {
    allLinks: [{
        url: {
            type: String,
            require: true
        },
        text: {
            type: String,
            require: true
        },
        dateFiled: {
            type: Number,
            require: true
        }
    }],
    registrant: {
        type: String,
        require: true,
    },
    number: {
        type: String,
        require: true
    },
    date: {
        type: Number,
        require: true
    }
},'fara');

export const SenateCandidate = mongoose.model('SenateCandidate', {
    first: {
        type: String,
        require: true
    },
    last: {
        type: String,
        require: true,
    },
    link: {
        url: {
            type: String,
            require: true
        },
        text: {
            type: String,
            require: true
        }
    },
    date: {
        type: Number,
        require: true
    }
}, 'senateCandidates');

export const Senator = mongoose.model('Senator', {
    first: {
        type: String,
        require: true
    },
    last: {
        type: String,
        require: true,
    },
    link: {
        url: {
            type: String,
            require: true
        },
        text: {
            type: String,
            require: true
        }
    },
    date: {
        type: Number,
        require: true
    }
}, 'senators' );