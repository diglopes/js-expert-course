

export default class Person {
    /**
     * @param person {object}
     * @param person.id {number}
     * @param person.vehicles {array}
     * @param person.kmTraveled {number}
     * @param person.from {string}
     * @param person.to {string}
     */
    constructor({
        id,
        vehicles,
        kmTraveled,
        from,
        to,
    }) {
        /**
         * @type {number}
         * @public
         */
        this.id = id
        /**
         * @type {array}
         * @public
         */
        this.vehicles = vehicles
        /**
         * @type {number}
         * @public
         */
        this.kmTraveled = kmTraveled
         /**
         * @type {number}
         * @public
         */
        this.from = from
        
        this.to = to
    }

    format(lang = 'en-us') {
        const dateFormater = new Intl.DateTimeFormat(lang, {
            year: 'numeric',
            month: "long",
            day: '2-digit'
        })

        return {
            id: this.id,
            vehicles: new Intl.ListFormat(lang, {
                style: 'long',
                type: 'conjunction'
            }).format(this.vehicles),
            kmTraveled: new Intl.NumberFormat(lang, {
                style: 'unit',
                unit: 'kilometer'
            }).format(this.kmTraveled),
            from: dateFormater.format(this.mapDate(this.from)),
            to: dateFormater.format(this.mapDate(this.to))
        }
    }

    mapDate(dateString) {
        const [year, month, day] = dateString.split('-')
        return new Date(year, month, day)
    }
}