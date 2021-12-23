const colors = {
    0: '#fff8e1',
    1: '#ffecb3',
    2: '#ffe082',
    3: '#ffd54f',
    4: '#ffca28',
    5: '#ffc107',
    6: '#ffb300',
    7: '#ffa000',
    8: '#ff8f00',
    9: '#ff6f00',
};

export const getColor = (value, max) => {
    const maxIndexColor = Object.keys(colors).length - 1;
    if (value < 0) value = 0;
    if (value > max) value = max;
    const id = Math.floor((value / max) * maxIndexColor);
    return colors[id];
};
