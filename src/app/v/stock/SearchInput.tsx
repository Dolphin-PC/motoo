"use client";

import React, { useRef } from "react";
import SearchIcon from "@/assets/icons/search.svg";
import Section from "@/components/section/Section";
import { useRecoilState } from "recoil";
import Button from "@/components/buttons/Button";
import { searchTextState } from "./atom";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useRecoilState(searchTextState);

  const onClickInputContainer = () => {
    inputRef.current?.focus();
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(inputRef.current?.value || "");
  };
  return (
    <div onClick={onClickInputContainer}>
      <Section>
        <form
          className="flex flex-row gap-3 items-center"
          onSubmit={onSubmitForm}
        >
          <input
            className="w-full outline-none"
            ref={inputRef}
            defaultValue={searchText}
            placeholder="주식명/종목번호"
          />
          <Button>
            <SearchIcon />
          </Button>
        </form>
      </Section>
    </div>
  );
};

export default SearchInput;
