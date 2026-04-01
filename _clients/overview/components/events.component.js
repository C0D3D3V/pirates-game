Vue.component('events-view', {
    props: ['events'],
    data: function() {
        return {
            popups: [],
            nextId: 0,
            lastTopMessage: null,
            timer: null,
        };
    },
    watch: {
        events: function(newEvents) {
            if (!newEvents || !newEvents.length) return;
            if (this.lastTopMessage === null) {
                this.lastTopMessage = newEvents[0].Message;
                return;
            }
            if (newEvents[0].Message === this.lastTopMessage) return;
            var lastIdx = newEvents.findIndex(function(e) { return e.Message === this.lastTopMessage; }.bind(this));
            var newOnes = lastIdx >= 0 ? newEvents.slice(0, lastIdx) : [newEvents[0]];
            var self = this;
            newOnes.slice().reverse().forEach(function(event) {
                self.popups.unshift({
                    id: self.nextId++,
                    message: event.Message,
                    icon: self.getEventIcon(event),
                    expires: Date.now() + 5000,
                });
            });
            this.lastTopMessage = newEvents[0].Message;
        }
    },
    mounted: function() {
        var self = this;
        this.timer = setInterval(function() {
            var now = Date.now();
            self.popups = self.popups.filter(function(p) { return p.expires > now; });
        }, 500);
    },
    beforeDestroy: function() {
        clearInterval(this.timer);
    },
    methods: {
        getEventIcon: function(event) {
            if (event.Message.match(/\[NEW-SHIP\]/))      return 'assets/icons/3.png';
            if (event.Message.match(/\[SHIP-ATTACK\]/))   return 'assets/icons/5.png';
            if (event.Message.match(/\[SHIP-DESTROYED\]/))return 'assets/icons/7.png';
            if (event.Message.match(/\[PORT-ATTACK\]/))   return 'assets/icons/2.png';
            if (event.Message.match(/\[PORT-LOOTED\]/))   return 'assets/icons/4.png';
        },
    },
    template: `
        <div class="event-popups">
            <transition-group name="event-fade" tag="div">
                <div class="event-popup" v-for="popup in popups" :key="popup.id">
                    <span class="event-icon" :style="{ backgroundImage: 'url(' + popup.icon + ')' }"></span>
                    <span>{{ popup.message }}</span>
                </div>
            </transition-group>
        </div>
    `,
});
