const got = require('@/utils/got');
const cheerio = require('cheerio');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

module.exports = async (ctx) => {
    const url = 'https://fed.chanceyu.com';
    const response = await got({
        method: 'get',
        url,
    });
    const data = response.data;
    const $ = cheerio.load(data);
    const list = $('script').next().html();
    const reg = /LINKS_DATA\s=\s(.*);$/;
    const show5DaysData = dayjs().local().subtract(5, 'day').format().split('T')[0];
    let targetArr = JSON.parse(list.match(reg)[1]);
    targetArr = targetArr
        .map((item) => ({
            title: item.title,
            items: JSON.stringify(item.items.filter((item2) => dayjs(item2.date).isAfter(show5DaysData))),
        }))
        .reduce((acc, crt) => (crt.items.length > 2 ? acc.concat(JSON.parse(crt.items)) : acc), [])
        .sort((a, b) => dayjs(b.date) - dayjs(a.date));

    // console.log('targetArr', targetArr);
    ctx.state.data = {
        title: '前端早读课',
        link: 'https://fed.chanceyu.com',
        item: targetArr,
    };
};
