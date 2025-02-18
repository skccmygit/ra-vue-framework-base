const sortByKeys = (keys: any) => {
    return (a: any, b: any) => {
        for (let key of keys) {
            if (a[key] < b[key]) return -1
            if (a[key] > b[key]) return 1
        }
        return 0
    }
}

const isString = (property: any) => {
    return (property !== null && typeof property === 'string')
}

export const ascendArray = (array: any, key: any) => {
    if (Array.isArray(array)) {
        if (Array.isArray(key)) {
            array.sort(sortByKeys(key))
        }
        else {
            array.sort(sortByKeys([key]))
        }
    }
}

export const ascendProperties = (object: any) => {
    if (object === null || typeof object !== 'object' || Array.isArray(object)) {
        return object
    }
    const sortedKeys = Object.keys(object).sort()
    const sortedObject = {} as any
    sortedKeys.forEach(key => {
        sortedObject[key] = object[key]
    })
    return sortedObject
}

export const setSequence = (items: any, index: number, key?: string) => {
    for (let item of items) {
        item[key || 'no'] = index++
    }
}

export const getFileExtension = (file: File) => {
    if (file?.name) {
        return file.name.substring(file.name.lastIndexOf('.') + 1)?.toLowerCase()
    }
    else {
        return null
    }
}

export const encodeToBase64 = (property: any) => {
    if (isString(property)) {
        return btoa(encodeURIComponent(property))
    } else {
        return btoa(encodeURIComponent(JSON.stringify(property)))
    }
}

export const decodeFromBase64 = (property: string) => {
    if (isString(property)) {
        return JSON.parse(decodeURIComponent(atob(property)))
    } else {
        return property
    }
}

export const hasSameValues = (obj1: any, obj2: any): boolean => {
    if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
        return obj1 === obj2
    }

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return obj1 === obj2
    }

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) {
        return false
    }

    for (const key of keys1) {
        if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
            if (!arraysEqual(obj1[key], obj2[key])) {
                return false
            }
        } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            if (!hasSameValues(obj1[key], obj2[key])) {
                return false
            }
        } else {
            if (obj1[key] !== obj2[key]) {
                return false
            }
        }
    }
    return true
}

const arraysEqual = (arr1: any[], arr2: any[]): boolean => {
    if (arr1 === null || arr1 === undefined || arr2 === null || arr2 === undefined) {
        return arr1 === arr2
    }

    if (arr1.length !== arr2.length) {
        return false
    }

    for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            if (!arraysEqual(arr1[i], arr2[i])) {
                return false
            }
        } else if (typeof arr1[i] === 'object' && typeof arr2[i] === 'object') {
            if (!hasSameValues(arr1[i], arr2[i])) {
                return false
            }
        } else {
            if (arr1[i] !== arr2[i]) {
                return false
            }
        }
    }
    return true
}
