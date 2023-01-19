export function httpList(firstCode = 100, lastCode = 600) {
    let list =[]
    list = ([...Array(lastCode).keys()].slice(firstCode))
    return list
}