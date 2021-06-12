import * as React from "react";
import { Statement } from "./types/statement";
import { TradeType } from "./types/trade";
import { TradeFilters, filterTrades } from "./utils/helper";

type TradesContextProps = { 
    state: State,    
    dispatch: React.Dispatch<TradeActions>,
    // filteredTrades: TradeType[],
    // setFilteredTrades(trades: TradeType[]) : void,
    // conversionRates?: Map<string, Map<string, number>>,
    // setConversionRates(rates: Map<string, Map<string, number>>) : void,  
};

const initialState = {
  trades: [],
  filteredTrades: [],  
  tradeFilters: {
    long: true,
    short: true,
    equities: true,
    options: true,
    futures: true,
    duration: 100,
  }
}

type State = {
  trades: TradeType[],
  filteredTrades: TradeType[],
  tradeFilters: TradeFilters  
}

export interface SetTradeAction {
  type: ActionType.SetTradeAction,
  payload: TradeType[]
}

export interface SetFilterAction {
  type: ActionType.SetFilterAction,
  payload: TradeFilters
}

export enum ActionType {
  SetTradeAction,
  SetFilterAction
}

type TradeActions = SetTradeAction | SetFilterAction;

type Props = {
    children: React.ReactNode
};


export const tradesReducer: React.Reducer<State, TradeActions> =  (state, action): State => {
  switch (action.type) {
    case ActionType.SetTradeAction:
      return {
        trades: action.payload,
        filteredTrades: action.payload.filter(t => filterTrades(t, state.tradeFilters)),
        tradeFilters: state.tradeFilters
      }
    case ActionType.SetFilterAction:
      const filters = action.payload;
      const filteredTrades = state.trades.filter(t => filterTrades(t, filters));
      return {
        trades: state.trades,
        filteredTrades: filteredTrades,
        tradeFilters: filters
      }   
    default:
      return state;
  }
}

export const TradesContext = React.createContext<TradesContextProps>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {}
});

export const TradesProvider = ({ children }: Props) => {    
    const [state, dispatch] = React.useReducer(tradesReducer, initialState);
    const value: TradesContextProps = {state, dispatch};
      
    return (
        <TradesContext.Provider value={value}>
          {children}     
        </TradesContext.Provider>         
    );
  };
  
export default TradesProvider;
  


