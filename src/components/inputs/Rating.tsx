import React from "react";
import styled from "styled-components";

interface EmojiRating {
  emoji: string;
  label: string;
  value: number;
}

const ratings: EmojiRating[] = [
  {
    emoji: "🤷‍♂️",
    label: "Idk, I haven't used it enough",
    value: 0,
  },
  {
    emoji: "🤮",
    label: "Yuck!",
    value: 1,
  },
  {
    emoji: "😒",
    label: "I'd prefer not to use it",
    value: 2,
  },
  {
    emoji: "😐",
    label: "Meh, it's fine I guess",
    value: 3,
  },
  {
    emoji: "🙂",
    label: "I'd happily use it again",
    value: 4,
  },
  {
    emoji: "😍",
    label: "Love it!",
    value: 5,
  },
];
export default function Rating({ value, onChange }) {
  const handleRating = (rating: EmojiRating) => {
    console.log(rating);
    onChange(rating.value);
  };
  let label = "Rate your experience";
  if (value > -1 && value <= 5) {
    let match = ratings.find((r) => r.value === value);
    if (match) label = match.label;
  }
  return (
    <StyledRating>
      <div className="buttons">
        {ratings.map((rating) => (
          <EmojiButton
            className={value === rating.value ? "selected" : ""}
            onClick={() => handleRating(rating)}
            title={rating.label}
          >
            <span>{rating.emoji}</span>
          </EmojiButton>
        ))}
      </div>
      <div className="label">
        <label>{label}</label>
      </div>
    </StyledRating>
  );
}

const StyledRating = styled.div`
  position: relative;
  text-align: center;
  .label {
    /* display: none; */
    margin-top: -3px;
    label {
      color: #777;
      font-size: 0.85em;
    }
  }
`;

const EmojiButton = styled.button`
  position: relative;
  font-size: 18px;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 1px;
  border: 1px solid #eee;
  background-color: transparent;
  user-select: none;
  border: none;
  text-decoration: none;
  border-radius: 50%;
  outline: transparent;
  > span {
    transition: opacity 0.15s ease-out;
    position: relative;
    top: -1px;
    opacity: 0.35;
  }
  &:hover {
    > span {
      opacity: 0.85;
    }
  }
  &.selected > span {
    opacity: 1;
  }
`;
