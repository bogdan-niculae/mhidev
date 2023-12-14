import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import Agent from "./Agent";
// ******** Images ********
import SeeMoreIcon from "../../assets/svg/more.svg";

/**
 * Typography
 * Primary agents are the agents which contain filtered state in the Business List of States and Business State
 * Secondary agents are the agents which contain filtered state only in the Business List of States
 */

const AllAgentsList = ({ allAgents, filters }) => {
  const [loadMore, setLoadMore] = useState(8);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [allReducedAgents, setAllReducedAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [primaryAgents, setPrimaryAgents] = useState([]);
  const [secondaryAgents, setSecondaryAgents] = useState([]);

  useEffect(() => {
    if (allAgents) {
      let agents = [];

      allAgents.forEach((agent) => {
        let item = {
          title: agent.title,
          uri: agent.uri,
          agentBussines: agent.newagent?.agentBusinessName
            ? `${agent.newagent?.agentBusinessName},${agent.title}`
            : `${agent.title}`,
          agentStates: [
            ...agent.newagent?.agentBusinessListStates,
            agent.newagent.agentBusinessState,
          ].toString(),
          ...agent.newagent,
        };
        agents.push(item);
      });

      setAllReducedAgents(agents);

      const getValue = (value) => (value ? value.toLowerCase() : value);

      let filteredAgentsList = agents.filter((agent) => {
        return Object.keys(filters).every(
          (propertyName) =>
            !filters[propertyName] ||
            getValue(agent[propertyName])?.indexOf(
              getValue(filters[propertyName])
            ) !== -1
        );
      });

      setFilteredAgents(filteredAgentsList);
    }
  }, [allAgents, filters]);

  /**
   * In case that we have entered State filter or city
   * But bussiness name filter is empty
   * We are creating two separate lists of agents Primary and Secondary
   * Primary list is the list where the filtered state has to be part of the agent business state and business list of states
   * Secondary list is the list where the filtered state has to be part of the business list state, but it doesn't have to be a part of the business state
   *
   * Important rule is that same agent can not be in both lists
   */
  useEffect(() => {
    if (
      (filters?.agentStates || filters?.agentBusinessCity) &&
      !filters?.agentBussines
    ) {
      // Represent the filtered state
      const filteredState = filters?.agentStates.toLowerCase();
      // Represent the filtered city
      const filteredCity = filters?.agentBusinessCity.toLowerCase();

      // Remaining agents that are not part of the primary list
      const restOfAgents = [];
      const primaryAgentList = [];

      allReducedAgents.forEach((agent) => {
        // In case that some agent pass condition that his state or city is equal with the filter value
        if (
          (agent.agentBusinessState.toLowerCase() === filteredState ||
            agent.agentBusinessCity.toLowerCase() === filteredCity) &&
          agent.agentBusinessListStates
            .join()
            .toLowerCase()
            .includes(filteredState)
        ) {
          /**
           * We are checking if the both value are equal with the filters values in that case we are pushing agent on the first place of the array
           * Oterwise we are pushing agent to the end of the list
           */
          if (
            agent.agentBusinessState.toLowerCase() === filteredState &&
            agent.agentBusinessCity.toLowerCase() === filteredCity
          ) {
            primaryAgentList.unshift(agent);
          } else {
            primaryAgentList.push(agent);
          }
        } else {
          restOfAgents.push(agent);
        }
      });

      let secondaryAgentList = [];
      if (restOfAgents?.length > 0) {
        secondaryAgentList = restOfAgents.filter((agent) =>
          agent.agentBusinessListStates
            .join()
            .toLowerCase()
            .includes(filteredState)
        );
      }

      setSecondaryAgents(secondaryAgentList);
      setPrimaryAgents(primaryAgentList);
    } else {
      setSecondaryAgents([]);
      setPrimaryAgents([]);
    }
  }, [allReducedAgents, filters]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLoadMore(loadMore + 9);
      setIsLoading(false);
    }, 750);
  };

  const computedTitle = useMemo(() => {
    if (filteredAgents?.length > 0) {
      if (filters.agentState || filters.agentCity || filters.agentAgencyName) {
        return (
          <h2>{`Find an Advisor Results For ${filters.agentCity} ${filters.agentState} ${filters.agentAgencyName}`}</h2>
        );
      } else {
        return null;
      }
    }
  }, [
    filteredAgents?.length,
    filters.agentAgencyName,
    filters.agentCity,
    filters.agentState,
  ]);

  const computedAgentList = useMemo(() => {
    if (
      (filters?.agentStates || filters?.agentBusinessCity) &&
      !filters?.agentBussines
    ) {
      return (
        <div>
          {/* In case that there is no primary agents hide the secion */}
          {primaryAgents?.length > 0 && (
            <>
              <h3>Local Agents in Your State</h3>
              <div className="agents-list">
                {primaryAgents.map((agent) => (
                  <Agent key={uuidv4()} agent={agent} />
                ))}
              </div>
            </>
          )}
          {/* In case that there is no secondary agents hide the secion */}
          {secondaryAgents?.length > 0 && (
            <>
              <h3>Virtual Agents Licensed in Your State</h3>
              <div className="agents-list">
                {secondaryAgents.map((agent) => (
                  <Agent key={uuidv4()} agent={agent} />
                ))}
              </div>
            </>
          )}
        </div>
      );
    } else {
      return (
        <div
          className={
            filteredAgents?.length > 0 ? "agents-list" : "agents-list is-hidden"
          }
        >
          {filteredAgents.map(
            (agent, index) =>
              index < loadMore && <Agent key={uuidv4()} agent={agent} />
          )}
        </div>
      );
    }
  }, [filters, filteredAgents, primaryAgents, secondaryAgents, loadMore]);

  return (
    <div className="all-agents-list">
      {computedTitle}
      {computedAgentList}

      {isLoading && (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {/* We are hiding the See More Results in case that we have primary or secondary agents */}
      {!secondaryAgents?.length && !primaryAgents?.length && (
        <div
          className={`see-more-agents ${
            loadMore > filteredAgents.length || isLoading ? "is-hidden" : ""
          } `}
          onClick={handleLoadMore}
        >
          <span>See More Results</span>
          <img src={SeeMoreIcon} alt="See all Articles" />
        </div>
      )}
    </div>
  );
};
export default AllAgentsList;
