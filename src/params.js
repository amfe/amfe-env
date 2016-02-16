var params = {};
const search = window.location.search.replace(/^\?/, '');

if (search) {
    let splits = search.split('&');
    for(let i = 0; i < splits.length; i++) {
        splits[i] = splits[i].split('=');
        try{
            params[splits[i][0]] = decodeURIComponent(splits[i][1]);
            /* istanbul ignore next */
        } catch(e) {
            /* istanbul ignore next */
            params[splits[i][0]] = splits[i][1];
        }
    }
}

export default params;
