const cheerio = require('cheerio');
const request = require('request');

url = 'http://applicant-test.us-east-1.elasticbeanstalk.com/'

function descobreTokenReal(token) {
    replacements = {
        'a': '\x7a',
        'b': '\x79',
        'c': '\x78',
        'd': '\x77',
        'e': '\x76',
        'f': '\x75',
        'g': '\x74',
        'h': '\x73',
        'i': '\x72',
        'j': '\x71',
        'k': '\x70',
        'l': '\x6f',
        'm': '\x6e',
        'n': '\x6d',
        'o': '\x6c',
        'p': '\x6b',
        'q': '\x6a',
        'r': '\x69',
        's': '\x68',
        't': '\x67',
        'u': '\x66',
        'v': '\x65',
        'w': '\x64',
        'x': '\x63',
        'y': '\x62',
        'z': '\x61',
        '0': '\x39',
        '1': '\x38',
        '2': '\x37',
        '3': '\x36',
        '4': '\x35',
        '5': '\x34',
        '6': '\x33',
        '7': '\x32',
        '8': '\x31',
        '9': '\x30'
    };

    for (var e = token.split(""), t = 0; t < e.length; t++) {
        e[t] = replacements.hasOwnProperty(e[t]) ? replacements[e[t]] : e[t];
    }
    return e.join("");
}

request(url, {}, function(err, res, body) {
    const cookie = res.caseless.dict['set-cookie'];
    const $ = cheerio.load(body);

    //Seleciona o primeiro input que contém o token e pega o valor
    let token = $('input')[0].attribs.value;
    token = descobreTokenReal(token);

    const optionSubmit = {
        form: {
            'token': token
        },
        method: 'post',
        headers: {
            'Referer': url,
            'Cookie': cookie,
        }
    };
    request.post(url, optionSubmit, function(err, res, bd) {
        $res = cheerio.load(bd);

        //Imprime resposta
        console.log('RESPOSTA: ' + $res('span')[0].children[0].data);
    })
});
