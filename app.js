const str = '[[}}'

let count = [];
const map = { ']': '[', '}': '{' };
let abc = true
for(let i=0; i<str.length;i++){
    if(str[i] == '[' || str[i] == '{'){
        count.push(str[i])
    }else {
        console.log('1111', map[str[i]],str[i],count.pop())
       if( count.pop()!=map[str[i]]) abc = false
       break
    }
}

console.log(count.length,typeof count.length,count.length ==0,abc)
console.log(abc)