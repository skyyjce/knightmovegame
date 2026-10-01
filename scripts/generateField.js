export class Field {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.table = document.querySelector('#field table');
    }

    get size() {
        return `${this.height}x${this.width}`;
    }

    render() {
        let tbody = document.createElement('tbody');


        for (let i = 0; i < this.width; i++) {
            let tr = document.createElement('tr');
            tr.className = `row-${i + 1}`;
            for (let j = 0; j < this.height; j++) {
                let td = document.createElement('td');
                td.textContent = (i * this.height) + j + 1;
                td.className = `x${i + 1}_y${j + 1}`;
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
        this.table.append(tbody);
    }

    removeField() {
        const tbody = this.table.querySelector('tbody');
        if (tbody) tbody.remove();
    }
}