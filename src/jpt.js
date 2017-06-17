function JsPureTabs(element) {

    this.init = function (params) {
        
        elem = document.getElementById(element);

        attributes = elem.attributes;
        tabs = elem.children;

        // Options
        defaultTab = params.defaultTab ? params.defaultTab : 1;
        containerHeight = params.containerHeight ? params.containerHeight : 0;
        containerWidth = params.containerWidth ? params.containerWidth : 0;

        horizontalPosition = params.horizontalPosition ? params.horizontalPosition : 'top';

        console.log(defaultTab);
        console.log(containerHeight);
        console.log(containerWidth);
        console.log(horizontalPosition);

        setupContainer();

        // Positioning tabs
        // If horizontal position is bottom, first wrap the selector then create controlls
        if (horizontalPosition === 'bottom') {
            wrapElement();
            createControlls();
        }
        // If horizontal position is not bottom, first create controlls then wrap the selector
        else {
            createControlls();
            wrapElement();
        }

        switchTabs();

    }

    /**
     * Find element by attribute name and its value
     */
    function findByAttributeValue(attribute, value) {
        var all = document.getElementsByTagName('*');

        for (var i = 0; i < all.length; i++) {
            if (all[i].getAttribute(attribute) == value) {
                return all[i];
            }
        }
    }

    /**
     * Create and setup container
     */
    function setupContainer() {
        // Container - wrapper
        container = document.createElement('div');
        // Set class for container
        container.setAttribute('class', 'jpt-container');

        // Get container style attribute value
        var style = container.getAttribute('style') ? container.getAttribute('style') : '';

        // If containerHeight param is set, apply it to the container
        if (containerHeight > 0) {
            style += 'height:' + containerHeight + 'px;';
            container.setAttribute('style', style);
        }

        // If containerWidth param is set, apply it to the container
        if (containerWidth) {
            style += 'width:' + containerWidth + ';';
            container.setAttribute('style', style);
        }

    }

    /**
     * Create controlls
     */
    function createControlls() {
        // Create tabs controlls container
        controlls = document.createElement('ul');
        controlls.setAttribute('class', 'jpt-controlls');
        container.appendChild(controlls);

        // Create tab controlls
        controllsHtml = '';
        for (i = 0; i < tabs.length; i++) {
            tab = tabs[i];
            tabId = tab.getAttribute('data-tab');
            tabName = tab.getAttribute('data-tab-name');
            tabActive = (i + 1) === defaultTab ? ' class="jpt-active"' : '';

            controllsHtml += '<li data-tab-id="' + tabId + '"' + tabActive + '>' + tabName + '</li>';

            tab.setAttribute('class', 'jpt-hide');

            if (i + 1 === defaultTab) {
                tab.setAttribute('class', 'jpt-show');
            }

        }

        // Add tabs controlls into tabs controlls container
        controlls.innerHTML = controllsHtml;
    }

    /**
     * Switch tabs on controlls click
     */
    function switchTabs() {
        // Tabs controlls
        controllLis = controlls.children;

        // Switch tabs onclick
        for (i = 0; i < controllLis.length; i++) {

            controll = controllLis[i];

            controll.onclick = function () {

                tabParent = this.parentNode;

                for (p = 0; p < tabParent.children.length; p++) {
                    tabParent.children[p].removeAttribute('class');
                }

                tabId = this.getAttribute('data-tab-id');
                tab = findByAttributeValue('data-tab', tabId);

                for (t = 0; t < tabs.length; t++) {
                    tabs[t].setAttribute('class', 'jpt-hide');
                }

                tab.setAttribute('class', 'jpt-show');
                this.setAttribute('class', 'jpt-active');

            }
        }
    }

    /**
     * Move our element inside the container
     * Add class to the element
     */
    function wrapElement() {
        elem.parentNode.insertBefore(container, elem);

        container.appendChild(elem);

        elemClass = elem.getAttribute('class');
        elemClass = !elemClass ? '' : elemClass + ' ';
        elem.setAttribute('class', elemClass + 'jpt-content');
    }

}
