Vue.component('tiles-view', {
    props: ['tiles'],
    data: function () {
        return {}
    },
    methods: {
        getIslandImage(type, x, y) {
            if (type === 'P') {
                var imgnr = x+y % 24;
                if (imgnr > 24 || imgnr == 0) {
                    imgnr = 1;
                }
                return 'assets/islands/island_'+imgnr+'.png';
            }
            return 'assets/transparent.png';
        },
    },
    template: `
        <div>
            <div class="tile-header-row">
                <div class="tile-label tile-corner"></div>
                <div class="tile-label tile-col-label" v-for="(tileY, Y) in (tiles && tiles[0])">{{ Y }}</div>
            </div>
            <div class="tile-map-row" v-for="(tileX, X) in tiles">
                <div class="tile-label tile-row-label">{{ X }}</div>
                <div class="tile" v-bind:style="{ backgroundImage: 'url(' + getIslandImage(tileY.Type, X, Y) + ')' }" v-for="(tileY, Y) in tileX">
                    <ships-view v-bind:ships="tileY.Ships"></ships-view>
                    <port v-bind:port="tileY.Port"></port>
                 </div>
            </div>
        </div>
    `,
});
