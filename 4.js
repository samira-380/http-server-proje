//Bir transaction nesnesini elle yaz: amount, type, category, date, note alanları olsun. Destructuring ile bu alanlara nasıl ulaşırsın?

const transaction={
    amount: 2000,
    type:"ücret",
    category:"eğitim",
    date:"2026-09-01",
    Note: "eğitim ücretidir."
}

const{amount,type,category,date,Note} = transaction;

console.log(amount);
console.log(type);
console.log(category);
console.log(date);
console.log(Note);