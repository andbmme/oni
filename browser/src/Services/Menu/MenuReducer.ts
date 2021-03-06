/**
 * MenuReducer.ts
 *
 * Implements state-change logic for the menu
 */

import * as Actions from "./MenuActions"
import * as State from "./MenuState"

export type MenuFilterFunction<T, FilteredT extends T> = (options: T[], searchString: string) => FilteredT[]

export function createReducer<T, FilteredT extends T>(filterFunc: MenuFilterFunction<T, FilteredT>) {

    const reducer = (s: State.IMenus<T, FilteredT>, a: Actions.MenuAction): State.IMenus<T, FilteredT> => {
        return {
            ...s,
            menu: popupMenuReducer(s.menu, a),
        }
    }

    function popupMenuReducer(s: State.IMenu<T, FilteredT> | null, a: any): State.IMenu<T, FilteredT> {

        // TODO: sync max display items (10) with value in Menu.render() (Menu.tsx)
        const size = s ? Math.min(10, s.filteredOptions.length) : 0

        switch (a.type) {

            case "SHOW_MENU":
                const options3 = a.payload.items || []
                const filterText = a.payload.filter || ""
                const filteredOptions3 = filterFunc(options3, filterText)
                return {
                    ...a.payload.options,
                    id: a.payload.id,
                    filter: filterText,
                    filteredOptions: filteredOptions3,
                    options: options3,
                    selectedIndex: 0,
                    isLoading: false,
                }
            case "SET_DETAILED_MENU_ITEM":
                if (!s || !s.options) {
                    return s
                }

                if (!a.payload.detailedItem) {
                    return s
                }

                const options = s.options.map((entry) => {
                    // TODO: Decide on canonical interface for menu options
                    if ((entry as any).label === a.payload.detailedItem.label) {
                        return a.payload.detailedItem
                    } else {
                        return entry
                    }
                })

                const filteredOptions2 = filterFunc(options, s.filter)
                return {
                    ...s,
                    options,
                    filteredOptions: filteredOptions2,
                }

            case "SET_MENU_ITEMS":
                if (!s || s.id !== a.payload.id) {
                    return s
                }

                const filteredOptions = filterFunc(a.payload.items, s.filter)

                return {
                    ...s,
                    options: a.payload.items,
                    filteredOptions,
                }
            case "SET_MENU_LOADING":
                if (!s || s.id !== a.payload.id) {
                    return s
                }

                return {
                    ...s,
                    isLoading: a.payload.isLoading,
                }
            case "HIDE_MENU":
                return null
            case "NEXT_MENU":
                return {...s,
                        selectedIndex: (s.selectedIndex + 1) % size}
            case "PREVIOUS_MENU":
                return {...s,
                        selectedIndex: s.selectedIndex > 0 ? s.selectedIndex - 1 : size - 1}
            case "FILTER_MENU":
                if (!s) {
                    return s
                }
                // If we already had search results, and this search is a superset of the previous,
                // just filter the already-pruned subset
                const optionsToSearch = a.payload.filter.indexOf(s.filter) === 0 ? s.filteredOptions : s.options
                const filteredOptionsSorted = filterFunc(optionsToSearch, a.payload.filter)

                return {...s,
                        filter: a.payload.filter,
                        filteredOptions: filteredOptionsSorted}
            default:
                return s
        }
    }

    return reducer
}
