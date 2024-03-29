const cron = require('node-cron');
const axios = require('axios');
const nodemailer = require('nodemailer');

const getIncomplete = async freq => {
    const ids = [];
    await axios.get(`http://localhost:5001/api/notification/habits/${freq}`)
                .then(res => { res.data.forEach(result => ids.push(result.id)); });
    const groupings = [];
    await axios.get(`http://localhost:5001/api/habits/read/groupings/${ids.reduce((sum, cur) => `${sum}+${cur}`)}`)
                .then(res => { res.data.forEach(result => groupings.push([result.Gid, JSON.parse(result.Value), result.Type, result.Lower_Bound])); })
    return groupings;
};

const getEmails = async freq => {
    const emails = [];
    await axios.get(`http://localhost:5001/api/notification/user/${freq}`)
                .then(res => { res.data.forEach(result => emails.push(result.Email)); })
    return emails;
};

const resetHabits = async freq => {
    await axios.put(`http://localhost:5001/api/notification/habits/reset/${freq}`);
    await axios.put(`http://localhost:5001/api/notification/habits/restart/${freq}`);
};

const updateValues = async values => {
    const set = async value => {
        await axios.put(`http://localhost:5001/api/habits/update/groupings/${value[1]}`, {"values": value[0]});
    };
    values.forEach(value => {
        set(value);
    });
};

const incrementValues = (value, type, low) => {
    const date = (new Date()).toISOString().split("T");
    if (type === "Scale") { value[`${date[0]}`] = `${low}`; }
    else { value[`${date[0]}`] = ""; }
    return value;
};

const mailer = emails => {
    const sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dear.habits.reminder@gmail.com',
            pass: 'ciiy qmlx imwf xtdg'
        }
    });

    emails.forEach(email => {
        const details = {
            from: 'dear.habits.reminder@gmail.com',
            to: email,
            subject: 'Reminder',
            text: `Hello ${email}! Just a friendly reminder to keep up your habits over at Dear Habits!`
        }

        sender.sendMail(details, (err, res) => {
            if (err) { console.log(err); }
            else { console.log(res); }
        })
    })
};

// Daily Tasks
// Reset Habits for Daily habits
cron.schedule('0 0 * * *', () => {
    const retrieve = async () => {
        const groups = await getIncomplete("Daily");
        resetHabits("Daily");
        const updated = groups.map(group => {
            group[1] = incrementValues(group[1], group[2], group[3]);
            return [JSON.stringify(group[1]), group[0]];
        });
        if (updated.length > 0) { await updateValues(updated); }
    };
    retrieve();
});

cron.schedule('0 12 * * *', () => {
    const retrieve = async () => {
        const groups = await getEmails("Daily");
        mailer(groups);
    };
    retrieve();
});

// Weekly Tasks
// Reset Habits for Weekly habits
cron.schedule('0 0 * * 1', () => {
    const retrieve = async () => {
        const groups = await getIncomplete("Weekly");
        resetHabits("Weekly");
        const updated = groups.map(group => {
            group[1] = incrementValues(group[1], group[2], group[3]);
            return [JSON.stringify(group[1]), group[0]];
        });
        if (updated.length > 0) { await updateValues(updated); }
    };
    retrieve();
});

cron.schedule('0 12 * * 1', () => {
    const retrieve = async () => {
        const groups = await getEmails("Weekly");
        mailer(groups);
    };
    retrieve();
});

// Monthly Tasks
// Reset Habits for Monthly habits
cron.schedule('0 0 1 * *', () => {
    const retrieve = async () => {
        const groups = await getIncomplete("Monthly");
        resetHabits("Monthly");
        const updated = groups.map(group => {
            group[1] = incrementValues(group[1], group[2], group[3]);
            return [JSON.stringify(group[1]), group[0]];
        });
        if (updated.length > 0) { await updateValues(updated); }
    };
    retrieve();
});

cron.schedule('0 12 1 * *', () => {
    const retrieve = async () => {
        const groups = await getEmails("Monthly");
        mailer(groups);
    };
    retrieve();
});