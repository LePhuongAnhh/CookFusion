// // var data = [
// //     {
// //         img: "https://wallpapercave.com/wp/wp3053214.jpg",
// //         slide_country: "VietNam",
// //         slide_place: " Ha Noi",
// //         slide_describe:
// //             "Vietnamese cuisine is a harmonious blend of flavors, textures, and colors that tantalizes the senses and reflects the rich cultural heritage of the country. From vibrant street food stalls to elegant restaurants, Vietnamese culinary delights are an exquisite journey through a myriad of tastes.",
// //     }, 
// //     {
// //         img: "https://wallpapercave.com/wp/wp3053214.jpg",
// //         slide_country: "VietNam",
// //         slide_place: " Ha Noi",
// //         slide_describe:
// //             "Vietnamese cuisine is a harmonious blend of flavors, textures, and colors that tantalizes the senses and reflects the rich cultural heritage of the country. From vibrant street food stalls to elegant restaurants, Vietnamese culinary delights are an exquisite journey through a myriad of tastes.",
// //     },
// //     {
// //         img: "https://wallpapercave.com/wp/wp3053214.jpg",
// //         slide_country: "VietNam",
// //         slide_place: " Ha Noi",
// //         slide_describe:
// //             "Vietnamese cuisine is a harmonious blend of flavors, textures, and colors that tantalizes the senses and reflects the rich cultural heritage of the country. From vibrant street food stalls to elegant restaurants, Vietnamese culinary delights are an exquisite journey through a myriad of tastes.",
// //     },
// //     {
// //         img: "https://wallpapercave.com/wp/wp3053214.jpg",
// //         slide_country: "VietNam",
// //         slide_place: " Ha Noi",
// //         slide_describe:
// //             "Vietnamese cuisine is a harmonious blend of flavors, textures, and colors that tantalizes the senses and reflects the rich cultural heritage of the country. From vibrant street food stalls to elegant restaurants, Vietnamese culinary delights are an exquisite journey through a myriad of tastes.",
// //     },
// //     {
// //         img: "https://wallpapercave.com/wp/wp3053214.jpg",
// //         slide_country: "VietNam",
// //         slide_place: " Ha Noi",
// //         slide_describe:
// //             "Vietnamese cuisine is a harmonious blend of flavors, textures, and colors that tantalizes the senses and reflects the rich cultural heritage of the country. From vibrant street food stalls to elegant restaurants, Vietnamese culinary delights are an exquisite journey through a myriad of tastes.",
// //     },
// // ];


// // const introduce = document.querySelector(".slid_introduce");
// // const ordinalNumber = document.querySelector(".slide_ordinal_number")

// // introduce.innerHTML = "";
// // ordinalNumber.innerHTML = "";
// // for (let i = 0; i < DataTransfer.length; i++) {
// //     introduce.innerHTML += `
// //     <div className={style.slide_wrapper}>
// //         <span>
// //             <h5 className={style.slide_country} style='--idx: 0'> ${data[i].country}</h5>
// //         </span>
// //         <span>
// //             <h1 className={style.slide_place}  style='--idx: 1'>${data[i].place}</h1>
// //         </span>
// //         <span>
// //             <p className={style.slide_describe}  style='--idx: 2'>${data[i].describe}</p>
// //         </span>
// //         <span>
// //             <button className={style.slide_discover_button}  style='--idx: 3'>Discover now</button>
// //         </span>
// //     </div>
// //     `;
// //     ordinalNumber.innerHTML += `<h2>()${i + 1}</h>`
// // }

// // <script src="./ind.js"></script>

// const IndexForm = () =>{
//     var data = [
//         {
//             img: "https://wallpapercave.com/wp/wp3053214.jpg",
//             slide_country: "VietNam",
//             slide_place: "Ha Noi",
//             slide_describe:
//                 "Vietnamese cuisine is a harmonious blend of flavors, textures, and colors that tantalizes the senses and reflects the rich cultural heritage of the country. From vibrant street food stalls to elegant restaurants, Vietnamese culinary delights are an exquisite journey through a myriad of tastes.",
//         },
//         // ... (other data objects)
//     ];
    
//     const introduce = document.querySelector(".slid_introduce");
//     const ordinalNumber = document.querySelector(".slide_ordinal_number");
    
//     introduce.innerHTML = "";
//     ordinalNumber.innerHTML = "";
    
//     for (let i = 0; i < data.length; i++) {
//         introduce.innerHTML += `
//         <div class="slide_wrapper">
//             <span>
//                 <h5 class="slide_country" style="--idx: 0">${data[i].slide_country}</h5>
//             </span>
//             <span>
//                 <h1 class="slide_place" style="--idx: 1">${data[i].slide_place}</h1>
//             </span>
//             <span>
//                 <p class="slide_describe" style="--idx: 2">${data[i].slide_describe}</p>
//             </span>
//             <span>
//                 <button class="slide_discover_button" style="--idx: 3">Discover now</button>
//             </span>
//         </div>
//         `;
    
//         ordinalNumber.inner += `<h2>(${i + 1})</h2>`;
//     }
// }
// export default IndexForm

