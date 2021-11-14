const form = document.querySelector('#searchForm');
const btc = document.querySelector('#btc');
const vol = document.querySelector('#volume');
const chg = document.querySelector('#change');
const timestamp = document.querySelector('#time');
const result = document.querySelector('#resulttable');
var update;

console.log("Start");
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(update){
        clearTimeout(update)
    }
    const ctype = form.elements.coinType.value;
    console.log("Ctype is : ",ctype);
    fetchcoinPrice(ctype);

    console.log("end");
});

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

const fetchcoinPrice = async(ctype)=>{
    const r = await axios.get(`https://api.cryptonator.com/api/ticker/${ctype}`);
    console.log(r)
    const price = r.data.ticker.price
    const volume = r.data.ticker.volume
    const change = r.data.ticker.change
    const base = r.data.ticker.base
    const target = r.data.ticker.target
    const time = timeConverter(r.data.timestamp)
    console.log(r.data.ticker.timestamp)
    result.innerHTML = `<tr>
    <td class="text-center" style="background-color: purple; color : white; font-weight : 700">Property</td>
    <td class="text-center" style="background-color: purple; color : white; font-weight : 700">Value</td>                              
</tr>
<tr>
    <td class="text-center">${base}</td>
    <td class="text-center"> ${price} ${target} </td>                                   
</tr>
<tr>
    <td class="text-center">Volume</td>
    <td class="text-center">${volume}</td>                                   
</tr>
<tr>
    <td class="text-center">Change</td>
    <td class="text-center">${change}</td>                                   
</tr>
<tr>
    <td class="text-center">Last Updated</td>
    <td class="text-center">${time}</td>                                   
</tr>
`
update = setTimeout(() =>fetchcoinPrice(ctype), 30000);

}
