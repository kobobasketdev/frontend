import { Stack, FormGroup, Checkbox, FormControlLabel, styled, FormControl, RadioGroup, Radio } from "@mui/material";
import { DropDownView } from "./CommonViews";
import { ChangeEvent, useState } from "react";

export const CheckBoxFilters = ({
	filtersGroup,
	appliedFilters,
	handleUpdateFilter
}: {
	filtersGroup: { [x: string]: string[] },
	appliedFilters: Set<string>,
	handleUpdateFilter: (key: string, filterOption: string) => () => void
}) => {
	const filtersKey = Object.keys(filtersGroup);

	return (
		<Stack pb={2.5} pt={2.5} gap={2}>
			{filtersKey.map((filterKey, index) => (
				<DropDownView title={filterKey} key={index}>
					<FormGroup>
						{
							filtersGroup[filterKey].map((filterOption, index) =>
								<StyledFormControlLabel key={index}
									control={
										<Checkbox size="small"
											onChange={handleUpdateFilter(filterKey, filterOption)}
											checked={appliedFilters.has(filterOption + '=>' + filterKey)}
										/>}
									label={filterOption}
								/>
							)
						}
					</FormGroup>
				</DropDownView>
			))}
		</Stack>
	);
};

type TRadioOptions = {
	value: string | number,
	label: string,
};
export const RadioFilters = ({
	title,
	filterOptions,
	handleUpdateFilter
}: {
	title: string,
	filterOptions: TRadioOptions[],
	handleUpdateFilter: (args: string) => void
}) => {

	const [value, setValue] = useState<string>('');
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = (e.target as HTMLInputElement).value;
		handleUpdateFilter(value + "");
		setValue(value);
	};
	return (
		<Stack pb={2.5} gap={2}>
			<DropDownView title={title} >
				<FormControl>
					<RadioGroup
						value={value}
						onChange={handleOnChange}
					>
						{
							filterOptions.map((filterOption, index) =>
								<StyledFormControlLabel value={filterOption.value} key={index}
									control={
										<Radio size="small"
										/>}
									label={filterOption.label}
								/>
							)
						}
					</RadioGroup>
				</FormControl>
			</DropDownView>
		</Stack>
	);
};

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	'.MuiTypography-root': {
		color: theme.palette.primaryBlack.main,
		fontFamily: 'Roboto',
		fontWeight: '400',
		fontSize: '16px',
		letterSpacing: '0.15px'
	}
}));