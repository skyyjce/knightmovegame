export class Field {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.tbody = document.querySelector('#field table tbody');
    }

    get size() {
        return `${this.height}x${this.width}`;
    }

    render() {
        if (!this.tbody) return;

        for (let i = 0; i < this.width; i++) {
            let tr = document.createElement('tr');
            tr.className = `row-${i + 1}`;
            for (let j = 0; j < this.height; j++) {
                let td = document.createElement('td');
                td.textContent = (i * this.height) + j + 1;
                td.className = `x${i + 1}_y${j + 1}`;
                tr.appendChild(td);
                this.tbody.appendChild(tr);
            }

        }

        // const td = document.createElement('td');
        // td.textContent = 'test';
        // td.className = 'cell-test';

        // tr.appendChild(td);
        // this.tbody.appendChild(tr);
    }
}