// console.log("Hello there!")
// let button = document.createElement("button")
// button.innerText = "BUTTONS!"
// document.body.appendChild(button)

const zeroPad = (number) => {
  return ('0' + number.toString()).slice(-2)
}

const parseLink = (link) => {
  const re = /ap(\d\d)(\d\d)(\d\d)\.html/
  return re.exec(link)
}

const newLink = (yesterdayLink, direction, duration) => {
  let link, year, month, day, rest, linkYear, linkMonth
  [ link, year, month, day, ...rest ] = parseLink(yesterdayLink)
  day = zeroPad(parseInt(day) + 1)
  let newLink = 'ap'
  switch(direction) {
    case "next":
      linkYear = (duration === "year") ? zeroPad(parseInt(year) + 1) : zeroPad(parseInt(year))
      if (duration === "month") {
        if (month === "12") {
          linkYear = zeroPad(parseInt(year) + 1)
          month = 0
        }
        linkMonth = zeroPad(parseInt(month) + 1)
      } else {
        linkMonth = zeroPad(parseInt(month))
      }
      newLink += [ linkYear, linkMonth,  day ].join('')
      return newLink += '.html'
    case "last":
      if (year === "00" ) { year = 100 }
      // generate last year
      linkYear = (duration === "year") ? zeroPad(parseInt(year) - 1) : zeroPad(parseInt(year))
      if (duration === "month") {
        if (month === "01") {
          linkYear = zeroPad(parseInt(year) - 1)
          month = 13
        }
        linkMonth = zeroPad(parseInt(month) - 1)
      } else {
        linkMonth = zeroPad(parseInt(month))
      }
      newLink += [ linkYear, linkMonth, day ].join('')
      return newLink += '.html'
  }
}

const monthLink = (yesterdayLink, direction) => {
  let link, year, month, day, rest
  [ link, year, month, day, ...rest ] = parseLink(yesterdayLink)
  let newLink = 'ap'

}

// BELOW HERE WORKS!
let navOptions = {}
chrome.storage.sync.get('navOptions', (data) => {
  // console.log(data)
  Object.assign(navOptions, data.navOptions)

  let hrElements = document.querySelectorAll("hr")
  let firstHR = hrElements[0]
  let secondHR = hrElements[1]
  let yesterdayLink = firstHR.nextElementSibling.getAttribute("href")

  if (navOptions.month) {
    let lastMonthLink = document.createElement("a")
    lastMonthLink.href = newLink(yesterdayLink, "last", "month")
    lastMonthLink.innerText = "<< Month"

    firstHR.insertAdjacentText("afterend", " | ")
    firstHR.insertAdjacentElement("afterend", lastMonthLink)

    let nextMonthLink = document.createElement("a")
    nextMonthLink.href = newLink(yesterdayLink, "next", "month")
    nextMonthLink.innerText = "Month >>"

    secondHR.insertAdjacentText("beforebegin", " | ")
    secondHR.insertAdjacentElement("beforebegin", nextMonthLink)
  }

  if (navOptions.year) {

    let lastYearLink = document.createElement("a")
    lastYearLink.href = newLink(yesterdayLink, "last", "year")
    lastYearLink.innerText = "<<< Year"

    firstHR.insertAdjacentText("afterend", " | ")
    firstHR.insertAdjacentElement("afterend", lastYearLink)

    let nextYearLink = document.createElement("a")
    nextYearLink.href = newLink(yesterdayLink, "next", "year")
    nextYearLink.innerText = "Year >>>"

    secondHR.insertAdjacentText("beforebegin", " | ")
    secondHR.insertAdjacentElement("beforebegin", nextYearLink)
  }
})

// BELOW HERE WORKS!
// let firstHR = document.querySelector("hr")
// let yesterdayLink = firstHR.nextSibling
// console.log(yesterdayLink)
// let span = document.createElement("span")
// span.innerText = "a span"
// firstHR.insertAdjacentText("afterend", " | ")
// firstHR.insertAdjacentElement("afterend", span)
