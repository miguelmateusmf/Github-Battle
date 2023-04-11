import * as React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import Table from "./Table";

function LanguagesNav({ selected, onChangeLanguage }) {
  const languages = [
    "All",
    "JavaScript",
    "Ruby",
    "Java",
    "CSS",
    "Python",
    "C++",
  ];

  return (
    <select
      onChange={(e) => onChangeLanguage(e.target.value)}
      selected={selected}
    >
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
};

export default class Popular extends React.Component {
  state = {
    selectedLanguage: "All",
    repos: null,
    error: null,
  };

  componentDidMount() {
    this.changeLanguage(this.state.selectedLanguage);
  }

  changeLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage: selectedLanguage,
      error: null,
    });

    fetchPopularRepos(selectedLanguage)
      .then((repos) =>
        this.setState({
          repos,
          error: null,
        })
      )
      .catch((error) => {
        console.warn("Error fetching repos", error);

        this.setState({
          error: "Error fetching",
        });
      });
  };

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Popular</h1>
          <LanguagesNav
            selected={selectedLanguage}
            onChangeLanguage={this.changeLanguage}
          />
        </div>

        {error && <p className="text-center error">{error}</p>}

        {repos && <Table repos={repos} />}
      </main>
    );
  }
}
