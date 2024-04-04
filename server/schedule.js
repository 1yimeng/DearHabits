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

// Backend portion to restart habits to they can be completed again and reset incompleted habits (FR18)
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

// Mailer to send out reminder emails (FR19)
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
// Restart Habits for Daily habits and reset habits that haven't been completed (FR18)
// FR18. Update Streak
cron.schedule('0 0 * * *', () => {
    const retrieve = async () => {
        const groups = await getIncomplete("Daily");
        resetHabits("Daily");  // Resets streaks and increment values for incomplete habits (FR18)
        const updated = groups.map(group => {
            group[1] = incrementValues(group[1], group[2], group[3]);
            return [JSON.stringify(group[1]), group[0]];
        });
        if (updated.length > 0) { await updateValues(updated); }
    };
    retrieve();
});

// FR19. Send Notifications
cron.schedule('0 12 * * *', () => {
    const retrieve = async () => {
        const groups = await getEmails("Daily");
        mailer(groups);  // Send out reminder emails for users who have set notifications to daily (FR19)
    };
    retrieve();
});

// Weekly Tasks
// Restart Habits for Weekly habits and reset habits that haven't been completed (FR18)
// FR18. Update Streak
cron.schedule('0 0 * * 1', () => {
    const retrieve = async () => {
        const groups = await getIncomplete("Weekly");
        resetHabits("Weekly");  // Resets streaks and increment values for incomplete habits (FR18)
        const updated = groups.map(group => {
            group[1] = incrementValues(group[1], group[2], group[3]);
            return [JSON.stringify(group[1]), group[0]];
        });
        if (updated.length > 0) { await updateValues(updated); }
    };
    retrieve();
});

// FR19. Send Notifications
cron.schedule('0 12 * * 1', () => {
    const retrieve = async () => {
        const groups = await getEmails("Weekly");
        mailer(groups);  // Send out reminder emails for users who have set notifications to weekly (FR19)
    };
    retrieve();
});

// Monthly Tasks
// Restart Habits for Monthly habits reset habits that haven't been completed (FR18)
// FR18. Update Streak
cron.schedule('0 0 1 * *', () => {
    const retrieve = async () => {
        const groups = await getIncomplete("Monthly");
        resetHabits("Monthly");  // Resets streaks and increment values for incomplete habits (FR18)
        const updated = groups.map(group => {
            group[1] = incrementValues(group[1], group[2], group[3]);
            return [JSON.stringify(group[1]), group[0]];
        });
        if (updated.length > 0) { await updateValues(updated); }
    };
    retrieve();
});

// FR19. Send Notifications
cron.schedule('0 12 1 * *', () => {
    const retrieve = async () => {
        const groups = await getEmails("Monthly");
        mailer(groups);  // Send out reminder emails for users who have set notifications to monthly (FR19)
    };
    retrieve();
});